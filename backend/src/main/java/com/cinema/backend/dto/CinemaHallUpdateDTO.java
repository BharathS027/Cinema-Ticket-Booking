package com.cinema.backend.dto;

import java.util.List;

public class CinemaHallUpdateDTO {
    private String orderTime;
    private List<Integer> updatedSeats;

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public List<Integer> getUpdatedSeats() {
        return updatedSeats;
    }

    public void setUpdatedSeats(List<Integer> updatedSeats) {
        this.updatedSeats = updatedSeats;
    }
}
