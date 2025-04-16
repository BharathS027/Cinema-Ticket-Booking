import React, { useState } from 'react';

const TicketConfirmation = ({ selectedMovieId, selectedSessionId, selectedSeats, user }) => {
  // Optional: You can manage the download state here if you need feedback after the download.
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadTicket = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/tickets/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          movieId: selectedMovieId,
          sessionId: selectedSessionId,
          seats: selectedSeats,
          userId: user.id,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ticket.pdf';
        link.click();
      } else {
        console.error('Failed to download ticket');
      }
    } catch (error) {
      console.error('Error downloading ticket', error);
    } finally {
      setIsDownloading(false);  // Reset the downloading state after the process
    }
  };

  return (
    <div>
      <h2>Booking Successful!</h2>
      <p>Your tickets are ready to be downloaded.</p>
      <button onClick={downloadTicket} disabled={isDownloading}>
        {isDownloading ? 'Downloading...' : 'Download Ticket'}
      </button>
    </div>
  );
};

export default TicketConfirmation;
