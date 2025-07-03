import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const Card = ({ component }) => {


  return (

    <div className="">
      <div className={`card bg-base-100 mx-auto w-[80vw] max-w-[280px] sm:w-[340px] sm:max-w-[300px] min-h-[280px] lg:min-h-[350px] flex flex-col justify-between border shadow-lg`}>
        <figure className="h-[100px] sm:h-[170px] relative">

          <img
            className="w-full h-full object-fill rounded-t-lg shadow-md"
            src={component?.imageUrl}
            alt="Course Banner"
          />
        </figure>
        <div className="card-body  flex flex-col justify-between px-3 sm:px-8 h-full ">
          <div className=" lg:space-y-3 flex-grow">
            <div className="flex justify-between">
              <p className="max-w-max px-3 rounded-sm text-[8px] lg:text-xs bg-primary text-white py-1">
                {component?.category}
              </p>
              <Link to={`/`}>
                <p className="flex justify-end text-xl sm:text-2xl">
                  <LuArrowUpRight />
                </p>
              </Link>
            </div>
            <h2 className="font-bold text-text_color text-[12px] lg:text-base">
              {component?.componentName}
            </h2>
          </div>
          <div className="flex items-end">

          </div>
        </div>
      </div>
    </div>

  );
};

export default Card;
