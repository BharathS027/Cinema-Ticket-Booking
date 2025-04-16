package com.cinema.backend.services;

import com.cinema.backend.models.Seat; // Import your Seat model
import com.cinema.backend.repositories.SeatRepository; // Import SeatRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import java.util.List;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository; // Autowire the SeatRepository to interact with the database

    /**
     * Update the status of multiple seats.
     * @param seatIds The list of seat IDs to be updated.
     * @param newStatus The new status for the seats.
     */
    @Transactional
    public void updateSeats(List<Long> seatIds, String newStatus) {
        // Fetch all seats by the provided IDs
        List<Seat> seats = seatRepository.findAllById(seatIds);

        // Iterate over the seats and update their status
        for (Seat seat : seats) {
            seat.setStatus(newStatus);  // Set the new status for the seat
            seatRepository.save(seat);  // Save the updated seat back to the database
        }
    }
}
