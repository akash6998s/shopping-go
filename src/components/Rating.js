import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClick, style }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick && onClick(i)} style={style}>
          {rating > i ? (
            <AiFillStar color="#ffc107" fontSize="20px" />
          ) : (
            <AiOutlineStar color="#ffc107" fontSize="20px" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
