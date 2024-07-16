import React from "react";
import first from "../images/first.jpeg";
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoFlagOutline } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const navigate=useNavigate()
  function details(id){
    navigate(`/overview/${id}`)

  }
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getTours() {
      let result = await fetch("http://localhost:5000/api/v1/getbookings",{
        method:"GET",
        headers:{

        "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
        "content-type":"application/json"}
      });
      result = await result.json();
      console.log(result.data)
      setData(result.data);
      console.log(data);
    }
    getTours();
  }, []);
  return (
    <div className="bg-slate-200">
      <Header></Header>
      <main className="relative flex flex-row flex-wrap justify-center text-slate-500   p-10">
        {data?.map((el) => {
          console.log(el)
          return (
            <>
              <div className="bg-white h-auto w-[300px] flex flex-col gap-1  m-10 ">
                <img src={`http://localhost:5000/images/tours/${el.tour.imageCover}`} alt="bhusahn" className="w-[300px] h-52"></img>
                <div className="flex flex-col p-5">
                  <h1 className="text-lg font-bold">
                    {el.difficulty} {el.tour.duration}day tour
                  </h1>
                  <p>{el.tour.summary}</p>
                </div>
                <div>
                  {/* <h1>dsnfjdfbndsjkjfbfdkjfnvmfdnbjfdbnbfd</h1> */}
                  <ul className="grid grid-cols-2 p-5">
                    <li className="flex">
                      <p>
                        {" "}
                        <CiLocationOn
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "green",
                          }}
                        ></CiLocationOn>
                      </p>

                      <span className="inline">mumbai</span>
                    </li>
                    <li className="flex">
                      <SlCalender
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "green ",
                        }}
                      ></SlCalender>
                      <span>15 june 2021</span>
                    </li>
                    <li className="flex">
                      <IoFlagOutline
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "green",
                        }}
                      ></IoFlagOutline>
                      <span>stops</span>
                    </li>
                    <li className="flex">
                      {" "}
                      <MdOutlineGroup
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "green",
                        }}
                      ></MdOutlineGroup>
                      <span>{el.maxGroupSize}people</span>
                    </li>
                  </ul>
                </div>
                <div className="flex  justify-between p-5 bg-slate-50">
                  <div>
                    <p>Rs.{el.price}</p>
                    <p>{el.rating} rating(5)</p>
                  </div>
                  <button className="bg-green-400 rounded-lg border-2 border-solid  text-whog(ite p-2" onClick={()=>{
                    // console.log(el._id,el.imageCover)
                    details(el.tour._id)
                  }}>

                    details
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </main>
    </div>
  );
}
