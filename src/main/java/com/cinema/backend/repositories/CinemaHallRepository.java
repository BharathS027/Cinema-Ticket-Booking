package com.cinema.backend.repositories;

import com.cinema.backend.models.CinemaHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CinemaHallRepository extends JpaRepository<CinemaHall, Long> {

    /**
     * Find a CinemaHall by movie ID and session.
     * Useful for retrieving seating data for a specific movie session.
     */
    Optional<CinemaHall> findByMovieIdAndMovieSession(Long movieId, String movieSession);

    /**
     * Get all sessions for a specific movie.
     * Useful for showing all showtimes for a movie.
     */
    List<CinemaHall> findAllByMovieId(Long movieId);

    /**
     * Find all halls by movie session (e.g., "2025-04-15 7:30 PM").
     */
    List<CinemaHall> findByMovieSession(String movieSession);

    /**
     * Check if a CinemaHall exists with given movie ID and session.
     * Prevents duplicate showtime creation.
     */
    boolean existsByMovieIdAndMovieSession(Long movieId, String movieSession);
}
