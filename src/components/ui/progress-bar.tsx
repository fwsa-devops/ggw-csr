'use client';
import * as Progress from '@radix-ui/react-progress';

const ProgressBar = (props: any) => {
  const { value } = props;

  return (
    <Progress.Root className="ProgressRoot" value={value}>
      <Progress.Indicator
        className="ProgressIndicator"
        style={{
          transform: `translateX(-${100 - value}%)`,
        }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
