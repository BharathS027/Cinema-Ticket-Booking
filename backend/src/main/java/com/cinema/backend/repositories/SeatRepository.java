package com.cinema.backend.repositories;

import com.cinema.backend.models.Seat;
import com.cinema.backend.models.CinemaHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    /**
     * Retrieve all seats for a specific cinema hall.
     * Useful for seat display and booking operations.
     */
    List<Seat> findByCinemaHall(CinemaHall cinemaHall);

    /**
     * Retrieve all seats for a specific cinema hall and row.
     * Useful for organizing seats by row.
     */
    List<Seat> findByCinemaHallAndRow(CinemaHall cinemaHall, String row);

    /**
     * Retrieve a specific seat in a cinema hall by row and seat number.
     * Useful for selecting a particular seat by label or number.
     */
    List<Seat> findByCinemaHallAndRowAndNumber(CinemaHall cinemaHall, String row, int number);

    /**
     * Retrieve all available (non-booked) seats for a specific cinema hall.
     * Useful for displaying and selecting available seats.
     */
    List<Seat> findByCinemaHallAndBookedFalse(CinemaHall cinemaHall);
    
    /**
     * Retrieve all seats for a cinema hall, sorted by row and seat number.
     * Useful for displaying the seat layout in order.
     */
    List<Seat> findByCinemaHallOrderByRowAscNumberAsc(CinemaHall cinemaHall);
}
