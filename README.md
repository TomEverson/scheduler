# Setup

Main Page is for User Who Wants To Create Schedule.
Guest Page is For User Who Wants To Get A Meeting.

# How To Run

1. Add Database String in .env ( PostgreSQL )
2. pnpm db:migrate to create migration file
3. pnpm db:push to push Migration Changes
4. pnpm run dev to start the pplication

# Architectural Choices:

1. Database => PostgreSQL with Neon
2. ServerSide => NextJS Endpoints

# Challenges

### 1. Calculating The Available Time, and Meeting Length Per Each Meeting

The Meeting Length Per Each Meeting is Calculated By Finding The Time Difference First, and Calculating How Much There is Time Difference on Each Day. For More Info, you can read /api/route

### 2. Assumptions

The Meeting Systems Haven't Been Finalized, however, it allows the user to book the meeting time they want.

Example Of Implementation on Buffer Time Before And After The Meeting

```javascript
const submitFunction = async () => {
  //? If Starting Time Or Ending Time Doesn't Exist
  if (timeState.startTime === 0 || timeState.endTime === 0) return;

  //? Doesn't Allow Starting Time To Bigger Than
  if (timeState.startTime > timeState.endTime) return;

  //? Buffer Periods Before And After The Meetings * Number Of Meetings Shouldn't Be Smaller Than Difference Between End And Start Time, and Assume 3 Mins is Default Length
  //? For Each Meeting
  if (
    2 * timeState.bufferPeriod * timeState.numberOfMeeting +
      3 * timeState.numberOfMeeting >
    timeState.endTime - timeState.startTime
  )
    return;

  await axios.post("/api", { timeState }).then((res) => {
    if (res.status === 200) setOpenState((prev) => !prev);
    mutate(`/api?day=${selectedDate}`);
    router.refresh();
  });
};
```

### 3. Potential Improvements

1. There Can Be Collision When Setting Up Multiple Meetings Time A Day
2. Can Use React-Query Instead Of SWR For Data Fetching
3. TRPC for More Type-Safe Query Call
4. Data Validations Methods For Both Client and Server Side
5. Amount Of Meeting Limit That Guest can have per day
6. Can Change the Buffer Periods, and Schedule after setting up.
