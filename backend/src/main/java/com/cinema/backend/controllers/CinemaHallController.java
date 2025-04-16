package com.cinema.backend.controllers;

import com.cinema.backend.dto.CinemaHallUpdateDTO;
import com.cinema.backend.models.CinemaHall;
import com.cinema.backend.models.Seat;
import com.cinema.backend.repositories.CinemaHallRepository;
import com.cinema.backend.repositories.SeatRepository;
import com.cinema.backend.services.CinemaHallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/movie")
public class CinemaHallController {

    @Autowired
    private CinemaHallRepository cinemaHallRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private CinemaHallService cinemaHallService;

    // ✅ RECOMMENDED: Use Query Param for session
    @GetMapping("/{movieId}")
    public ResponseEntity<?> getUpdatedSeatsByQuery(
            @PathVariable Long movieId,
            @RequestParam("session") String session) {

        Optional<CinemaHall> cinemaHallOptional = cinemaHallRepository.findByMovieIdAndMovieSession(movieId, session);
        if (cinemaHallOptional.isPresent()) {
            List<Seat> sortedSeats = getSortedSeats(cinemaHallOptional.get());
            return ResponseEntity.ok().body(sortedSeats);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Cinema hall for movie ID " + movieId + " and session " + session + " not found"));
        }
    }

    // ✅ LEGACY SUPPORT: Use Path Variable for session (with decoding)
    @GetMapping("/{movieId}/{movieSession}")
    public ResponseEntity<?> getUpdatedSeatsByPath(
            @PathVariable Long movieId,
            @PathVariable String movieSession) {

        String decodedSession = URLDecoder.decode(movieSession, StandardCharsets.UTF_8);

        Optional<CinemaHall> cinemaHallOptional = cinemaHallRepository.findByMovieIdAndMovieSession(movieId, decodedSession);
        if (cinemaHallOptional.isPresent()) {
            List<Seat> sortedSeats = getSortedSeats(cinemaHallOptional.get());
            return ResponseEntity.ok().body(sortedSeats);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Cinema hall for movie ID " + movieId + " and session " + decodedSession + " not found"));
        }
    }

    // ✅ PUT request to update seats
    @PutMapping("/{movieId}/{movieSession}")
    public ResponseEntity<?> updateOccupiedSeats(
            @PathVariable Long movieId,
            @PathVariable String movieSession,
            @RequestBody CinemaHallUpdateDTO updateDTO) {
        try {
            String decodedSession = URLDecoder.decode(movieSession, StandardCharsets.UTF_8);

            Optional<CinemaHall> cinemaHallOptional = cinemaHallRepository.findByMovieIdAndMovieSession(movieId, decodedSession);
            CinemaHall cinemaHall = cinemaHallOptional.orElseGet(CinemaHall::new);

            cinemaHall.setMovieId(movieId);
            cinemaHall.setMovieSession(decodedSession);

            if (updateDTO.getOrderTime() != null)
                cinemaHall.setOrderTime(updateDTO.getOrderTime());

            // ✅ Convert Integer to Long
            List<Long> seatIds = updateDTO.getUpdatedSeats().stream()
                    .map(Integer::longValue)
                    .collect(Collectors.toList());

            if (!seatIds.isEmpty()) {
                List<Seat> bookedSeats = seatRepository.findAllById(seatIds);

                // ✅ Mark seats as booked
                for (Seat seat : bookedSeats) {
                    seat.setBooked(true);
                    seat.setStatus("booked");
                    seatRepository.save(seat);
                }

                // ✅ Set updated seats in hall
                List<Long> bookedSeatIds = bookedSeats.stream()
                        .map(Seat::getId)
                        .map(Long::valueOf)
                        .collect(Collectors.toList());

                cinemaHall.setUpdatedSeats(bookedSeatIds);
            }

            cinemaHallRepository.save(cinemaHall);

            String message = cinemaHallOptional.isPresent()
                    ? "Cinema hall updated successfully"
                    : "New cinema hall entry created successfully";

            return ResponseEntity.ok().body(Map.of("message", message));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error while updating cinema hall: " + e.getMessage()));
        }
    }

    // ✅ POST request to create CinemaHall and generate seats
    @PostMapping("/create")
    public ResponseEntity<CinemaHall> createCinemaHall(@RequestBody CinemaHall cinemaHall) {
        try {
            CinemaHall createdCinemaHall = cinemaHallService.createCinemaHall(cinemaHall);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCinemaHall);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // ✅ GET request to fetch seats for a specific CinemaHall
    @GetMapping("/cinema-hall/{id}/seats")
    public ResponseEntity<?> getSeats(@PathVariable Long id) {
        Optional<CinemaHall> cinemaHall = cinemaHallRepository.findById(id);
        if (cinemaHall.isPresent()) {
            List<Seat> seats = seatRepository.findByCinemaHall(cinemaHall.get());
            return ResponseEntity.ok(sortSeats(seats));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Cinema hall not found for id " + id));
        }
    }

    // ✅ Helper method to sort by row then number
    private List<Seat> getSortedSeats(CinemaHall hall) {
        List<Seat> seats = seatRepository.findByCinemaHall(hall);
        return sortSeats(seats);
    }

    private List<Seat> sortSeats(List<Seat> seats) {
        return seats.stream()
                .sorted(Comparator
                        .comparing(Seat::getRow)       // Ensure getRow() method exists in Seat
                        .thenComparing(Seat::getNumber))  // Ensure getNumber() method exists in Seat
                .collect(Collectors.toList());
    }
}
