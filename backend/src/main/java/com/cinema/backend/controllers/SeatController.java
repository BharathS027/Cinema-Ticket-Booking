package com.cinema.backend.controllers;

import com.cinema.backend.services.SeatService; // Import SeatService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List; // Import List

/**
 * Controller for managing seat operations.
 */
@RestController
@RequestMapping("/api/v1/seats") // Base path for all seat-related endpoints
public class SeatController {

    @Autowired
    private SeatService seatService; // Inject SeatService to handle business logic

    /**
     * Endpoint to update the status of multiple seats by their IDs.
     *
     * @param seatIds A list of seat IDs to be updated.
     * @param status  The new status to set for the seats (e.g., "BOOKED", "AVAILABLE").
     * @return ResponseEntity with HTTP status 200 OK if the update is successful.
     */
    @PutMapping("/update")
    public ResponseEntity<Void> updateSeatStatus(
            @RequestBody List<Long> seatIds,
            @RequestParam String status
    ) {
        // Call SeatService to perform the update
        seatService.updateSeats(seatIds, status);
        return ResponseEntity.ok().build();
    }
}
