import Title from "@/shared/components/Title";
import ClassCard from "@/features/classes/components/ClassCard";
import { getCardColor } from "@/shared/constants/cardColors";

const ClassList = ({ classes }) => {
  const classData = classes || [];

  return (
    <div className="my-10">
      <div className="text-center py-8 px-10 text-3xl">
        <Title text1="Class" text2="List" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600">
          List of all classes teached here!
        </p>
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {classData.map((cls, index) => (
          <ClassCard key={cls._id} cls={cls} color={getCardColor(index)} />
        ))}
      </div>
    </div>
  );
};

export default ClassList;
