import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeatSelector from './SeatSelector';
import SeatShowcase from './SeatShowcase';

function SeatPlan({ movie }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [recommendedSeat, setRecommendedSeat] = useState(null);
  const [movieSession, setMovieSession] = useState({ time: '09:00 am' });
  const [userName, setUserName] = useState('DemoUser');
  const [userId, setUserId] = useState('12345');
  const [seatPlan, setSeatPlan] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const navigate = useNavigate();

  // Mock seat plan
  const mockSeatPlan = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    status: Math.random() < 0.2 ? 'occupied' : 'available',
  }));

  useEffect(() => {
    setSeatPlan(mockSeatPlan);
  }, []);

  const occupiedSeats = seatPlan.filter(seat => seat.status === 'occupied').map(seat => seat.id);
  const availableSeats = seatPlan.filter(seat => seat.status === 'available').map(seat => seat.id);
  const filteredAvailableSeats = availableSeats.filter(seat => !occupiedSeats.includes(seat));

  useEffect(() => {
    const recommended = filteredAvailableSeats.find(seat => !occupiedSeats.includes(seat));
    setRecommendedSeat(recommended);
  }, [filteredAvailableSeats]);

  const getSeatPrice = (seatId) => {
    const rowIndex = Math.floor(seatId / 8);
    const row = String.fromCharCode(65 + rowIndex);
    if (['A', 'B'].includes(row)) return 400;
    if (['C', 'D', 'E'].includes(row)) return 230;
    return 200;
  };

  const totalPrice = selectedSeats.reduce((acc, seatId) => acc + getSeatPrice(seatId), 0);

  const selectedSeatText = selectedSeats.map(seat => {
    const label = String.fromCharCode(65 + Math.floor(seat / 8)) + (seat % 8 + 1);
    return label;
  }).join(', ');

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) return;

    const orderDate = new Date().toISOString();

    // Simulate ticket creation
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

    // Simulate updating seat plan
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
    <div className="flex flex-col items-center">
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
        <>
          <div className="w-full md:w-1/2 lg:w-2/3 px-6">
            <h2 className="mb-8 text-2xl font-semibold text-center">
              Choose your seats by clicking on the available seats
            </h2>
          </div>

          <div className="CinemaPlan relative">
            <SeatSelector
              movie={{ occupied: occupiedSeats }}
              selectedSeats={selectedSeats}
              recommendedSeat={recommendedSeat}
              onSelectedSeatsChange={setSelectedSeats}
              onRecommendedSeatChange={setRecommendedSeat}
            />

            <SeatShowcase />

            <p className="info mb-2 text-sm md:text-sm lg:text-base">
              You have selected{' '}
              <span className="count font-semibold">{selectedSeats.length}</span>{' '}
              seat{selectedSeats.length !== 1 ? 's' : ''}{' '}
              {selectedSeatText && `: ${selectedSeatText}`}{' '}
              {selectedSeats.length > 0 && (
                <>
                  for the price of{' '}
                  <span className="total font-semibold">₹{totalPrice}</span>
                </>
              )}
            </p>

            {selectedSeats.length > 0 ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white rounded px-3 py-2 text-sm font-semibold cursor-pointer"
                onClick={handleButtonClick}
              >
                Buy at <span className="total font-semibold">₹{totalPrice}</span>
              </button>
            ) : (
              <p className="info text-sm md:text-sm lg:text-base">
                Please select a seat
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SeatPlan;
