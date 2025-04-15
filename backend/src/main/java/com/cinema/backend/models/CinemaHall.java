package com.cinema.backend.models;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "cinema_hall")
public class CinemaHall {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long movieId;
    private String movieSession;
    private String orderTime;

    @ElementCollection
    private List<Long> updatedSeats; // List of Seat IDs (Long)

    @OneToMany(mappedBy = "cinemaHall", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Seat> seats;

    public CinemaHall() {}

    public CinemaHall(Long id, Long movieId, String movieSession, String orderTime, List<Long> updatedSeats, List<Seat> seats) {
        this.id = id;
        this.movieId = movieId;
        this.movieSession = movieSession;
        this.orderTime = orderTime;
        this.updatedSeats = updatedSeats;
        this.seats = seats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getMovieSession() {
        return movieSession;
    }

    public void setMovieSession(String movieSession) {
        this.movieSession = movieSession;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public List<Long> getUpdatedSeats() {
        return updatedSeats;
    }

    public void setUpdatedSeats(List<Long> updatedSeats) {
        this.updatedSeats = updatedSeats;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CinemaHall that)) return false;
        return Objects.equals(id, that.id) &&
                Objects.equals(movieId, that.movieId) &&
                Objects.equals(movieSession, that.movieSession) &&
                Objects.equals(orderTime, that.orderTime) &&
                Objects.equals(updatedSeats, that.updatedSeats) &&
                Objects.equals(seats, that.seats);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, movieId, movieSession, orderTime, updatedSeats, seats);
    }

    @Override
    public String toString() {
        return "CinemaHall{" +
                "id=" + id +
                ", movieId=" + movieId +
                ", movieSession='" + movieSession + '\'' +
                ", orderTime='" + orderTime + '\'' +
                ", updatedSeats=" + updatedSeats +
                ", seats=" + seats +
                '}';
    }
}
