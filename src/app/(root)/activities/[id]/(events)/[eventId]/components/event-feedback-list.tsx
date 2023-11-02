import EventFeedbackListItem from './event-feedback-list-item';
import 'react-medium-image-zoom/dist/styles.css';

const EventFeedbackList = ({ feedbacks }: { feedbacks: any[] }) => {
  return (
    <>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {feedbacks.map((feedbackItem) => (
            <li key={feedbackItem.id}>
              <div className="relative pb-8">
                <EventFeedbackListItem feedback={feedbackItem} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EventFeedbackList;
