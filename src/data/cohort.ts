import { mockBootcamps as bootcamps } from '@/data/bootcamps';
import { Cohort } from '@/types';

export const mockCohorts: Cohort[] = [
  {
    id: 'coh-1',
    bootcampSlug: bootcamps[0]?.slug || 'full-stack-web-development',
    startDate: '2026-09-01T09:00:00Z',
    endDate: '2026-12-15T17:00:00Z',
    seatsTotal: 20,
    seatsLeft: 3,
    format: 'online',
    timezone: 'GMT+3',
  },
  {
    id: 'coh-2',
    bootcampSlug: bootcamps[1]?.slug || 'frontend-react-nextjs',
    startDate: '2026-09-15T09:00:00Z',
    endDate: '2026-11-30T17:00:00Z',
    seatsTotal: 15,
    seatsLeft: 0,
    format: 'hybrid',
    timezone: 'GMT+3',
  },
  {
    id: 'coh-3',
    bootcampSlug: bootcamps[2]?.slug || 'data-science-machine-learning',
    startDate: '2026-10-05T09:00:00Z',
    endDate: '2027-01-20T17:00:00Z',
    seatsTotal: 25,
    seatsLeft: 8,
    format: 'online',
    timezone: 'GMT+3',
  },
  {
    id: 'coh-4',
    bootcampSlug: bootcamps[3]?.slug || 'devops-cloud-engineering',
    startDate: '2026-07-01T09:00:00Z',
    endDate: '2026-09-30T17:00:00Z',
    seatsTotal: 18,
    seatsLeft: 0,
    format: 'onsite',
    timezone: 'GMT+3',
  },
];
