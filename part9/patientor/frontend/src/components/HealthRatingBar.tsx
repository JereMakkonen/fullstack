import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';

import { styled } from '@mui/material/styles';

type BarProps = {
  rating: number;
  showText: boolean;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  }
});

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  const healthBarStyle = { 
    display: "flex", 
    alignItems: "center", 
    gap: "0.5rem",
  };

  return (
    <div className="health-bar" style={healthBarStyle}>
      {showText ? HEALTHBAR_TEXTS[rating] : null}
      <StyledRating
        readOnly
        value={4 - rating}
        max={4}
        icon={<Favorite fontSize="inherit" />}
      />
    </div>
  );
};

export default HealthRatingBar;
