import Title from "./Title";
import Classcard from "./Classcard";

const ClassList = ({ classes }) => {
  const classData = classes;
  console.log("the data in class list ", classData);
  const colorClasses = [
    {
      bg: "bg-green-50",
      accent: "bg-green-500",
    },
    {
      bg: "bg-blue-50",
      accent: "bg-blue-500",
    },
    {
      bg: "bg-purple-50",
      accent: "bg-purple-500",
    },
    {
      bg: "bg-pink-50",
      accent: "bg-pink-500",
    },
    {
      bg: "bg-yellow-50",
      accent: "bg-yellow-500",
    },
  ];

  return (
    <div className="my-10">
      {/* Title */}
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1={"Class"} text2={"List"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          List of all classes teached here!
        </p>
      </div>

      {/* Class cards will go here */}
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {classData.map((cls, index) => (
          <Classcard
            key={cls._id}
            cls={cls}
            color={colorClasses[index % colorClasses.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassList;
