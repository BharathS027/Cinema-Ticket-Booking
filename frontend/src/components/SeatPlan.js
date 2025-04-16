import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeatSelector from './SeatSelector';
import SeatShowcase from './SeatShowcase';

function SeatPlan({ movie }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [recommendedSeat, setRecommendedSeat] = useState(null);
  const [seatPlan, setSeatPlan] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const navigate = useNavigate();

  const userName = 'DemoUser';
  const userId = '12345';
  const movieSession = { time: '09:00 am' };

  // Generate mock seat plan
  useEffect(() => {
    const mockSeatPlan = Array.from({ length: 64 }, (_, i) => ({
      id: i,
      status: Math.random() < 0.2 ? 'occupied' : 'available',
    }));
    setSeatPlan(mockSeatPlan);
  }, []);

  const occupiedSeats = seatPlan
    .filter(seat => seat.status === 'occupied')
    .map(seat => seat.id);

  const availableSeats = seatPlan
    .filter(seat => seat.status === 'available')
    .map(seat => seat.id);

  const filteredAvailableSeats = availableSeats.filter(seat => !occupiedSeats.includes(seat));

  // Suggest a recommended seat
  useEffect(() => {
    const recommended = filteredAvailableSeats.find(seat => !occupiedSeats.includes(seat));
    setRecommendedSeat(recommended);
  }, [filteredAvailableSeats, occupiedSeats]);

  const getSeatPrice = (seatId) => {
    const rowIndex = Math.floor(seatId / 8);
    const row = String.fromCharCode(65 + rowIndex);
    if (row === 'H') return 400; // Recliner
    if (['E', 'F', 'G'].includes(row)) return 230; // Prime
    return 200; // Classic
  };

  const totalPrice = selectedSeats.reduce((acc, seatId) => acc + getSeatPrice(seatId), 0);

  const selectedSeatText = selectedSeats
    .map(seat => String.fromCharCode(65 + Math.floor(seat / 8)) + (seat % 8 + 1))
    .join(', ');

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) return;

    const orderDate = new Date().toISOString();

    const myOrder = {
      customerId: userId,
      userName,
      orderDate,
      movieId: movie.id,
      movieTitle: movie.title,
      movieGenres: movie.genres.map(g => g.name).join(', '),
      movieRuntime: movie.runtime,
      movieLanguage: movie.original_language,
      moviePrice: totalPrice,
      seat: selectedSeats,
    };

    const updatedSeats = seatPlan.map(seat =>
      selectedSeats.includes(seat.id) ? { ...seat, status: 'occupied' } : seat
    );

    setSeatPlan(updatedSeats);
    setTicketDetails({
      ...myOrder,
      formattedDate: new Date(orderDate).toLocaleString(),
      seats: selectedSeatText,
      sessionTime: movieSession.time,
    });
    setOrderConfirmed(true);
  };

  return (
    <div className="flex flex-col items-center py-8 px-4">
      {orderConfirmed && ticketDetails ? (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-green-600">🎫 Ticket Confirmed!</h2>
          <p className="text-lg font-semibold">{ticketDetails.movieTitle}</p>
          <p className="text-sm text-gray-600 mb-2">Session: {ticketDetails.sessionTime}</p>
          <p><strong>Seats:</strong> {ticketDetails.seats}</p>
          <p><strong>Total:</strong> ₹{ticketDetails.moviePrice}</p>
          <p><strong>Order Time:</strong> {ticketDetails.formattedDate}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <h2 className="mb-6 text-2xl font-semibold text-center">
            Choose your seats by clicking on the available seats
          </h2>

          <SeatSelector
            movie={{ occupied: occupiedSeats }}
            selectedSeats={selectedSeats}
            recommendedSeat={recommendedSeat}
            onSelectedSeatsChange={setSelectedSeats}
            onRecommendedSeatChange={setRecommendedSeat}
          />

          <SeatShowcase />

          <div className="text-center mt-6 text-sm md:text-base">
            {selectedSeats.length > 0 ? (
              <p className="mb-3">
                You have selected <span className="font-medium">{selectedSeats.length}</span>{' '}
                seat{selectedSeats.length > 1 ? 's' : ''}{' '}
                {selectedSeatText && `(${selectedSeatText})`} for the price of{' '}
                <span className="font-semibold">₹{totalPrice}</span>
              </p>
            ) : (
              <p>Please select a seat</p>
            )}
            {selectedSeats.length > 0 && (
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                onClick={handleButtonClick}
              >
                Buy at ₹{totalPrice}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SeatPlan;
