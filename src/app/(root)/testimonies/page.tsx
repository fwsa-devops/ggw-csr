import UserAvatar from '@/components/user-avatar';
import prisma from '@/lib/prisma';

export default async function Example() {
  const testimonials = await prisma.feedback.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="py-10 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {testimonials.length > 0
              ? 'We have worked with hundreds of amazing people'
              : "It seems we don't have any testimonials to display at the moment. This is a great opportunity for you to be the first to share your story!"}
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          {testimonials.length > 0 && (
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-2">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="pt-8 sm:inline-block sm:w-full sm:px-4"
                >
                  <figure className="rounded-2xl bg-gray-100 p-8 text-sm leading-6">
                    <blockquote className="font-medium leading-6 sm:text-lg sm:leading-7 text-gray-700">
                      <p>{`“${testimonial.comment}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <UserAvatar user={testimonial.author} />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.author.name}
                        </div>
                        {/* <div className="text-gray-600">{`${testimonial.author.email}`}</div> */}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
