import React from 'react';
import TicketConfirmation from '../components/TicketConfirmation'; // Correct path to TicketConfirmation

const BookingSuccessPage = ({ selectedMovieId, selectedSessionId, selectedSeats, user }) => {
  return (
    <div>
      <h2>Booking Successful!</h2>
      <p>Your tickets are ready to be downloaded.</p>
      <TicketConfirmation
        selectedMovieId={selectedMovieId}
        selectedSessionId={selectedSessionId}
        selectedSeats={selectedSeats}
        user={user}
      />
    </div>
  );
};

export default BookingSuccessPage;
