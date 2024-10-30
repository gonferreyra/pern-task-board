let navigate: (path: string, options: any) => void;

export const setNavigate = (fn: (path: string, options: any) => void) => {
  navigate = fn;
};

export const getNavigate = () => navigate;
