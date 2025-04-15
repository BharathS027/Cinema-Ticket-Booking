import React, { useEffect, useState } from 'react';

const SeatSelector = ({
  movie,
  selectedSeats,
  recommendedSeat,
  onSelectedSeatsChange,
  onRecommendedSeatChange,
}) => {
  const [sessionTime, setSessionTime] = useState(null);

  // Predefined seat grid (8x8)
  const seats = Array.from({ length: 8 * 8 }, (_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const label = String.fromCharCode(65 + row) + (col + 1);

    let type = 'CLASSIC';
    if (row === 0) type = 'RECLINER';
    else if (row === 1 || row === 2) type = 'PRIME';

    return {
      id: i,
      label,
      type,
      price: type === 'RECLINER' ? 400 : type === 'PRIME' ? 230 : 200,
    };
  });

  useEffect(() => {
    const storedMovieSession = JSON.parse(localStorage.getItem('movieSession'));
    if (storedMovieSession?.time) {
      setSessionTime(storedMovieSession.time);
    }
  }, []);

  const handleSelectedState = (seat) => {
    const isSelected = selectedSeats.includes(seat.id);
    if (isSelected) {
      onSelectedSeatsChange(selectedSeats.filter((s) => s !== seat.id));
    } else {
      onSelectedSeatsChange([...selectedSeats, seat.id]);
    }
    onRecommendedSeatChange(null);
  };

  const getSeatColor = (type) => {
    switch (type) {
      case 'RECLINER': return 'lightgreen';
      case 'PRIME': return 'lightblue';
      default: return 'lightgrey';
    }
  };

  const getSeatTooltip = (seat) =>
    `${seat.label} - ${seat.type} - ₹${seat.price}`;

  return (
    <div className="Cinema">
      {sessionTime && (
        <p className="info mb-2 text-sm md:text-sm lg:text-base">
          Session Time: {sessionTime}
        </p>
      )}

      <div className="screen mb-4 w-full text-center font-semibold text-sm md:text-base">
        Screen This Way
      </div>

      <div
        className="seats"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '8px' }}
      >
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          const isOccupied = movie.occupied.includes(seat.id);
          const showRecommended = selectedSeats.length === 0 && recommendedSeat === seat.id;

          return (
            <button
              key={seat.id}
              title={getSeatTooltip(seat)}
              onClick={!isOccupied ? () => handleSelectedState(seat) : null}
              style={{
                padding: '8px',
                fontSize: '0.8rem',
                backgroundColor: getSeatColor(seat.type),
                opacity: isOccupied ? 0.5 : 1,
                borderRadius: '5px',
                border: isSelected
                  ? '2px solid #2ecc71'
                  : showRecommended
                  ? '2px dashed orange'
                  : '1px solid #ccc',
                cursor: isOccupied ? 'not-allowed' : 'pointer',
                textAlign: 'center',
              }}
              className={`seat ${isSelected ? 'selected' : ''} ${
                isOccupied ? 'occupied' : ''
              } ${showRecommended ? 'recommended' : ''}`}
            >
              {seat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SeatSelector;
