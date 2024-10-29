let navigate: () => void;

export const setNavigate = (fn) => {
  navigate = fn;
};

export const getNavigate = () => navigate;
