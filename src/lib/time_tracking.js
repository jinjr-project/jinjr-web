export function progressWidthForTimeTracking(timeTracking) {
  if (!timeTracking) {
    return 0;
  }
  
  return (timeTracking.time_spent.seconds / timeTracking.original_estimate.seconds) * 100;
}