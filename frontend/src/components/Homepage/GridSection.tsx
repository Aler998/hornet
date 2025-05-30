interface GridSectionProps {
  title: string;
  description: string;
  img: string;
  reverse: boolean;
}

function GridSection({ title, description, img, reverse }: GridSectionProps) {
  const classes = `flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-4 mb-12 md:mb-4`;
  const titleClasses = `text-center ${reverse ? "md:text-end" : "md:text-start"} font-inter text-lg font-semibold`
  const descClasses = `text-center ${reverse ? "md:text-end" : "md:text-start"} font-inter text-sm`
  return (
    <div className={classes}>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img className="w-2/3" src={img} alt={title} />
      </div>
      <div className="w-full md:w-1/2 justify-center flex flex-col text-grey-900 dark:text-white">
        <p className={titleClasses}>{title}</p>
        <p className={descClasses}>{description}</p>
      </div>
    </div>
  );
}

export default GridSection;
