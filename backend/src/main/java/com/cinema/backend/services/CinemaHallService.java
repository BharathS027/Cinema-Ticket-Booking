package com.cinema.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.backend.models.CinemaHall;
import com.cinema.backend.models.Seat;
import com.cinema.backend.repositories.CinemaHallRepository;
import com.cinema.backend.repositories.SeatRepository;

@Service
public class CinemaHallService {

    @Autowired
    private CinemaHallRepository cinemaHallRepository;

    @Autowired
    private SeatRepository seatRepository;

    /**
     * Generates default 64 seats for a given cinema hall based on row and type.
     */
    public void generateSeats(CinemaHall cinemaHall) {
        String[] rowLabels = {"A", "B", "C", "D", "E", "F", "G", "H"};
        int seatsPerRow = 8;

        // Seat configurations (row type and price)
        String[][] seatConfig = {
            {"RECLINER", "₹400"}, // First two rows as RECLINER with ₹400
            {"PRIME", "₹230"},    // Middle rows as PRIME with ₹230
            {"CLASSIC", "₹200"}   // Last rows as CLASSIC with ₹200
        };

        for (int i = 0; i < rowLabels.length; i++) {
            String row = rowLabels[i];
            String type;
            double price;

            if (i < 2) { // RECLINER rows
                type = seatConfig[0][0];
                price = Double.parseDouble(seatConfig[0][1].replace("₹", ""));
            } else if (i < 5) { // PRIME rows
                type = seatConfig[1][0];
                price = Double.parseDouble(seatConfig[1][1].replace("₹", ""));
            } else { // CLASSIC rows
                type = seatConfig[2][0];
                price = Double.parseDouble(seatConfig[2][1].replace("₹", ""));
            }

            for (int j = 1; j <= seatsPerRow; j++) {
                Seat seat = new Seat();
                seat.setLabel(row + j);
                seat.setType(type);
                seat.setPrice(price); // Set seat price
                seat.setBooked(false); // Ensure it's unbooked initially
                seat.setStatus("available"); // If you use status in your frontend
                seat.setCinemaHall(cinemaHall);
                seatRepository.save(seat);
            }
        }
    }

    /**
     * Creates a CinemaHall entry and auto-generates seat entries for it.
     */
    public CinemaHall createCinemaHall(CinemaHall cinemaHall) {
        // Save the CinemaHall first
        CinemaHall savedCinemaHall = cinemaHallRepository.save(cinemaHall);

        // Generate and save seats for the newly created CinemaHall
        generateSeats(savedCinemaHall);

        // Retrieve and map seat IDs (as Longs)
        List<Long> seatIds = seatRepository.findByCinemaHall(savedCinemaHall).stream()
                .map(Seat::getId)
                .collect(Collectors.toList());

        // Set updatedSeats in the saved cinema hall
        savedCinemaHall.setUpdatedSeats(seatIds);
        return cinemaHallRepository.save(savedCinemaHall);
    }
}
