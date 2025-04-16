import React from 'react';

function SeatSelector({ movie, selectedSeats, onSelectedSeatsChange, recommendedSeat }) {
  const rows = 8;
  const seatsPerRow = 8;

  // Define row types and their prices
  const rowTypes = {
    A: { type: 'CLASSIC', price: 200 },
    B: { type: 'CLASSIC', price: 200 },
    C: { type: 'CLASSIC', price: 200 },
    D: { type: 'CLASSIC', price: 200 },
    E: { type: 'PRIME', price: 230 },
    F: { type: 'PRIME', price: 230 },
    G: { type: 'PRIME', price: 230 },
    H: { type: 'RECLINER', price: 400 },
  };

  const toggleSeat = (seatId) => {
    if (movie.occupied.includes(seatId)) return;
    const updatedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];
    onSelectedSeatsChange(updatedSeats);
  };

  const getSeatClass = (seatId) => {
    if (movie.occupied.includes(seatId)) return 'bg-gray-400 cursor-not-allowed';
    if (selectedSeats.includes(seatId)) return 'bg-green-500 text-white';
    if (seatId === recommendedSeat) return 'bg-yellow-400';
    return 'bg-white hover:bg-blue-200';
  };

  // To track which group header was already shown
  const shownGroups = new Set();

  return (
    <div className="flex flex-col items-center py-6">
      {/* Screen */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-3/4 md:w-1/2 h-12 bg-transparent border-4 border-gray-400 rounded-full shadow-lg text-center text-xl font-bold flex items-center justify-center text-gray-700 tracking-widest">
          S C R E E N
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center text-2xl font-extrabold text-gray-700 mb-8">
        All Eyes Over Here!
      </div>

      {/* Seat Grid with grouping */}
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const rowLetter = String.fromCharCode(65 + rowIndex);
          const { type, price } = rowTypes[rowLetter];
          const shouldShowGroup = !shownGroups.has(type);

          if (shouldShowGroup) shownGroups.add(type);

          return (
            <div key={rowLetter}>
              {shouldShowGroup && (
                <div className="text-center font-bold text-sm text-gray-700 mb-1">
                  ₹{price} {type}
                </div>
              )}
              <div className="flex items-center justify-center gap-1">
                <span className="w-6 text-right font-semibold text-lg">{rowLetter}</span>
                {Array.from({ length: seatsPerRow }).map((_, colIndex) => {
                  const seatId = rowIndex * seatsPerRow + colIndex;
                  return (
                    <div
                      key={seatId}
                      title={`Seat ${rowLetter}${colIndex + 1}`}
                      onClick={() => toggleSeat(seatId)}
                      className={`w-10 h-10 border rounded-md text-xs flex items-center justify-center cursor-pointer ${getSeatClass(seatId)}`}
                    >
                      {colIndex + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeatSelector;
