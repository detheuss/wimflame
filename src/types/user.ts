type BaseUser = {
  userId: string;
  email: string;
  password: string;
  /**
   * this is to offer special benefits, e.g.
   * first 1000 users
   * users created in promo periods
   */
  dateTimeRegistered: string; // ISO 8601 format, e.g. "2025-04-02T12:34:56Z"
  appId: string;
};

type WimflameUser = BaseUser & {
  sessionHistory: BreathingSession[];
  retentionAverage: number; // average retentionTime of all sessions
};

type BreathingSession = {
  userId: string;
  sessionId: string;
  dateTime: string; // ISO 8601 format, e.g. "2025-04-02T12:34:56Z"
  retentionTimes: number[]; // in seconds, e.g. [120, 140, 152]
  retentionAverage: number; // average retentionTime of this session
};
