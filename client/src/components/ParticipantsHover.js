import React from 'react';

const ParticipantsHover = ({ participants = [] }) => {
  return (
    <span className="participants-hover">
      <strong>{participants.length}</strong>
      <small>runners</small>

      <div className="participants-popup">
        {participants.length > 0 ? (
          participants.map((participant) => (
            <div className="participant" key={participant._id}>
              {participant.name}
            </div>
          ))
        ) : (
          <div>No runners yet</div>
        )}
      </div>
    </span>
  );
};

export default ParticipantsHover;

