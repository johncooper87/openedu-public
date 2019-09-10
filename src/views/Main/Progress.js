import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@kemsu/graphql-client';
import { Loader, Link } from '@kemsu/core';
import { Editor } from '@kemsu/editor';
import { SubsectionView as useStyles } from './styles';
import RouteBackBtn from '@components/RouteBackBtn';

export const COURSE_DELIVERY_PROGRESS = ({ id = 'Int!', userId = 'Int' }) => `
  courseDeliveryInstanceUserProgress(courseDeliveryInstanceId: ${id} userId: ${userId}) {
    unitName
    score
    quiz
  }
`;

function Progress({ id, userId }) {
  
  const [{ courseDeliveryInstanceUserProgress }, loading, errors] = useQuery(COURSE_DELIVERY_PROGRESS, { id, userId });
  let allScores = 0;
  let maxAllScores = 0;
  if (courseDeliveryInstanceUserProgress) for (const progress of courseDeliveryInstanceUserProgress) {
    allScores += progress.score;
    maxAllScores += progress.quiz.maxScore;
  }

  return <Loader loading={loading} errors={errors}>
    {courseDeliveryInstanceUserProgress && <div>

      <Typography variant={userId ? 'h6' : 'h4'}>Баллы за тесты</Typography>
      {courseDeliveryInstanceUserProgress.map(
        (progress, index) => <div key={index}>
          <Typography style={{ paddingTop: '12px' }} variant={userId ? undefined : 'h6'}>{progress.unitName}: {progress.score || 0} из {progress.quiz.maxScore}</Typography>
        </div>
      )}

      <Divider style={{ marginTop: '12px' }} />
      <div>
        <Typography style={{ paddingTop: '12px' }} variant={userId ? undefined : 'h6'}>Всего: {allScores} из {maxAllScores}</Typography>
      </div>

    </div>}
  </Loader>;
}

export default React.memo(Progress);