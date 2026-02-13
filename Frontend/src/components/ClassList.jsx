import Title from "./Title";
import Classcard from "./Classcard";

const ClassList = ({ classes }) => {
  const classData = classes;
  console.log("the data in class list ", classData);

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
        {classData.map((cls) => (
          <Classcard key={cls._id} cls={cls} />
        ))}
      </div>
    </div>
  );
};

export default ClassList;
