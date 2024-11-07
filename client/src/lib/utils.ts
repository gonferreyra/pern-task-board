export const getImageUrl = (status: string) => {
  switch (status) {
    case 'completed':
      return '/Done_round_duotone.svg';
    case 'in-progress':
      return '/Time_atack_duotone.svg';
    case 'wont-do':
      return '/close_ring_duotone.svg';
    default:
      return '/list_duotone.svg';
  }
};
