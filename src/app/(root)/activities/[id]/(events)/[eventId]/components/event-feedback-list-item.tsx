import PostsList from '@/components/upload-image/PostsList';
import UserAvatar from '@/components/user-avatar';

const EventFeedbackListItem = ({ feedback }: { feedback: any }) => {
  return (
    <>
      {/* {JSON.stringify(feedback, null, 4)} */}

      <div className="relative flex items-start space-x-3 border-2 rounded w-full p-4 mt-4">
        <div className="relative">
          <UserAvatar user={feedback.author} />
        </div>

        <div className="min-w-0 flex-1">
          <div>
            <div className="text-sm">
              <a className="font-medium text-gray-900">
                {feedback.author.name}
              </a>
            </div>
            {/* <p className="mt-0.5 text-sm text-gray-500">Commented {feedback.created_at}</p> */}
          </div>
          <div className="mt-2 text-sm text-gray-700">
            <p>{feedback.comment}</p>
          </div>
          <div className="flex flex-wrap gap-6 mt-4">
            <PostsList imageUrls={feedback.assets.map((_a) => _a.Asset)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventFeedbackListItem;
