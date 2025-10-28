export function useDateFormat() {
  function getTimeDifference(date: Date): { difference: number; unit: string } {
    const tzOffsetInMilliseconds = new Date().getTimezoneOffset() * 60000;

    // calculate the time difference in milliseconds
    const diffMs = Math.abs(
      new Date().getTime() - tzOffsetInMilliseconds - date.getTime()
    );

    // define the thresholds for each unit of time
    const thresholds = [
      { threshold: 1000 * 60 * 60, unit: 'hours' },
      { threshold: 1000 * 60 * 60 * 24, unit: 'days' },
      { threshold: 1000 * 60 * 60 * 24 * 30, unit: 'months' },
      { threshold: 1000 * 60 * 60 * 24 * 365, unit: 'years' },
    ];

    // iterate through the thresholds to find the appropriate unit
    let i = 0;
    while (i < thresholds.length - 1 && diffMs >= thresholds[i + 1].threshold) {
      i++;
    }

    // calculate the difference in the selected unit
    const difference = Math.floor(diffMs / thresholds[i].threshold);

    // return the difference and unit as an object
    return { difference: difference * -1, unit: thresholds[i].unit };
  }

  function formatToRelativeDate(date: Date) {
    const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
    });
    const { difference, unit } = getTimeDifference(date);

    const today = new Date();

    if (unit === 'hours' && today.getDate() === date.getUTCDate()) {
      return 'today';
    } else if (unit === 'hours' && today.getDate() !== date.getUTCDate()) {
      return 'yesterday';
    }

    const relativeTime = relativeTimeFormatter.format(difference, unit as any);

    return relativeTime;
  }

  function formatToDDMMYYYY(date: Date) {
    return new Intl.DateTimeFormat('en-GB').format(date);
  }

  return { formatToRelativeDate, formatToDDMMYYYY };
}
