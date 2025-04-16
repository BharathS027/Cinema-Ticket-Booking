package com.cinema.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private String type;
    private double price;
    private boolean booked;
    private String status;

    // Add these two fields for sorting (row and seat number)
    private String row;
    private int number;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cinema_hall_id")
    private CinemaHall cinemaHall;

    // Default constructor
    public Seat() {
    }

    // Constructor with fields
    public Seat(String label, String type, double price, boolean booked, String status, String row, int number, CinemaHall cinemaHall) {
        this.label = label;
        this.type = type;
        this.price = price;
        this.booked = booked;
        this.status = status;
        this.row = row;
        this.number = number;
        this.cinemaHall = cinemaHall;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRow() {
        return row;
    }

    public void setRow(String row) {
        this.row = row;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public CinemaHall getCinemaHall() {
        return cinemaHall;
    }

    public void setCinemaHall(CinemaHall cinemaHall) {
        this.cinemaHall = cinemaHall;
    }

    // Optionally, you can override `toString`, `equals`, and `hashCode` methods
    @Override
    public String toString() {
        return "Seat{" +
                "id=" + id +
                ", label='" + label + '\'' +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", booked=" + booked +
                ", status='" + status + '\'' +
                ", row='" + row + '\'' +
                ", number=" + number +
                '}';
    }
}
