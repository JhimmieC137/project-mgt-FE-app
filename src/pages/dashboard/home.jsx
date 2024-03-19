import React, { useEffect, useState } from "react";
import { Circles } from 'react-loader-spinner'
import { SlPlus } from "react-icons/sl";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  PlayCircleIcon,
  PlusSmallIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import SearchBar from "@/widgets/layout/search-bar";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { BsListUl } from "react-icons/bs";
import { serverUrl } from "@/configs/endpoints";
import { BiLoaderCircle } from "react-icons/bi";

export function Home() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  function getProjects() {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      setData(JSON.parse(this.responseText));
      setLoading(false)
    }
    
    try{
      xhttp.open("GET", `${serverUrl.projects.base}`);
      xhttp.send();
    }
    catch (e){
      console.log("error fetching")
    }
  }

  useEffect(() => {
    setInterval(() => getProjects(), 10000);
  }, [])
  
  return (
    <div className="">
      <div className="py-3 flex place-content-between">
        <Typography variant="h3" color="blue-gray" className="mb-1">
          My projects
        </Typography>
        <div className="px-2 flex place-content-end">
          <SearchBar />
          <Button
            variant="gradient"
            color="dark"
            className="flex items-center "
          >
            <HiMiniAdjustmentsHorizontal className="h-5 w-5 text-slate-300" />
            <Typography
              color="inherit"
              className="font-medium capitalize"
            >
              {/* Stuff */}
            </Typography>
          </Button>
        </div>
        <div className="px-2 flex place-content-end">
          <Button
            variant="gradient"
            color="white"
            className="flex items-center "
          >
            <SlPlus className="h-5 w-5 text-blue-gray-500"/>
            <Typography
              color="inherit"
              className="font-medium capitalize"
            >
              {/* Stuff */}
            </Typography>
          </Button>
        </div>
      </div>
      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div> */}
      {/* <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3 bg-transparent">
        <Card className=" xl:col-span-2 shadow-sm bg-transparent">
          {/* <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader> */}
          <CardBody className="w-full min-w-[640px] pt-5 pb-2">
            {
              loading ? 
              <div className="min-w-[640px]  flex place-content-center w-full my-36">
                <Circles
                  height="50"
                  width="50"
                  color="#8B9296"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
              :
              <table className="w-full min-w-[640px] table-auto border-separate border-spacing-y-5">
                <thead>
                  <tr className="table-auto drop-shadow-lg  bg-white bg-blue-gray-50/50">
                    {["Task name", "Due in", "Tasks", "Status", "Members"].map(
                      (el) => (
                        <th
                        key={el}
                        className="py-3 px-6 text-left first:rounded-l-xl bg-blue-gray-50/50 last:rounded-r-xl"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      )
                      )}
                  </tr>
                </thead>
                <tbody>
                  {data ?
                    data.results.map(
                    ({ name, created_at, due_in, tasks_completed, tasks }, key) => {
                      const className = `py-3 px-5 ${
                        key === data.results.length - 1
                          ? ""
                          : ""
                      }`;

                      return (
                        <tr 
                          key={name}
                          className="bg-white drop-shadow-xl"
                          >
                          <td className={`${className} first:rounded-l-xl  my-2 first:bg-blue-gray-50/50`}>
                            <div className="flex items-center gap-2">
                              <Avatar src={"/img/logo-xd.svg"} alt={name} size="sm" />
                              <div className="pl-2">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold text-md text-left"
                                >
                                  {name}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold text-xs font-medium text-blue-gray-300 text-left"
                                >
                                  {created_at}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={`${className} my-2 bg-blue-gray-50/50`}>
                            <div className="w-full rounded-l-md bg-sky-950">
                              <Typography
                                variant="small"
                                className="text-sm  text-center font-medium text-blue-gray-600"
                              >
                                {due_in}
                              </Typography>
                            </div>
                          </td>
                          <td className={`${className} my-2 bg-blue-gray-50/50`}>
                            <div className="w-full py-2 text-left">
                              <Typography
                                variant="small"
                                className="text-md font-medium text-blue-gray-600"
                              >
                                {`${tasks_completed}/${tasks}`}
                              </Typography>
                              <Typography
                                variant="small"
                                className="text-xs font-bold text-gray-500"
                              >
                                Tasks
                              </Typography>

                            </div>
                          </td>
                          <td className={`${className} bg-blue-gray-50/50`}>
                            <div className="w-10/12 ">
                              <div className="w-full flex">
                                <BsListUl className="text-lg pt-1"/>
                                <Typography
                                  variant="small"
                                  className="mb-1 block px-2 text-md font-medium text-blue-gray-600"
                                  >
                                  Progress
                                </Typography>
                              </div>
                              <Progress
                                value={(tasks_completed/tasks)*100}
                                variant="gradient"
                                color={((tasks_completed/tasks)*100) === 100 ? "green" : "blue"}
                                className="h-1"
                              />
                            </div>
                          </td>
                          <td className={`${className} last:rounded-r-xl last:bg-blue-gray-50/50`}>
                            {projectsTableData[1].members.map(({ img, name }, key) => (
                              <Tooltip key={name} content={name}>
                                <Avatar
                                  src={img}
                                  alt={name}
                                  size="xs"
                                  variant="circular"
                                  className={`cursor-pointer border-2 border-white ${
                                    key === 0 ? "" : "-ml-2.5"
                                  }`}
                                />
                              </Tooltip>
                            ))}
                          </td>
                        </tr>
                      );
                    }
                  ): null
                  }
                </tbody>
              </table>
            }
          </CardBody>
        </Card>
        <div className="px-5 bg-transparent">
          <Card className="bg-transparent shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex place-content-between m-0 p-6"
            >
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Upcomming meeting
              </Typography>
              <a className="text-gray-sky-500 hover:underline" href="/#">see all</a>
              {/* <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <ArrowUpIcon
                  strokeWidth={3}
                  className="h-3.5 w-3.5 text-green-500"
                />
                <strong>24%</strong> this month
              </Typography> */}
            </CardHeader>
            <CardBody className="pt-0 px-7">
              {/* {ordersOverviewData.map(
                ({ icon, color, title, description }, key) => (
                  <div key={title} className="flex items-start gap-4 py-3">
                    <div
                      className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                        key === ordersOverviewData.length - 1
                          ? "after:h-0"
                          : "after:h-4/6"
                      }`}
                    >
                      {React.createElement(icon, {
                        className: `!w-5 !h-5 ${color}`,
                      })}
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium"
                      >
                        {title}
                      </Typography>
                      <Typography
                        as="span"
                        variant="small"
                        className="text-xs font-medium text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </div>
                  </div>
                )
              )} */}
              <div className="pt-3 pb-2 rounded-2xl bg-green-100">
                <Typography variant="h5" color="blue-gray" className="px-3 mb-2">
                  Meeting Name
                </Typography>
                <div className="">
                  <Typography 
                    variant="small" 
                    color="blue-gray"
                    className="text-sm px-3 font-medium text-blue-gray-600 mb-2"
                    >
                      The meeting aims to show areas of improvement and ensure the design aligns with the user needs and business goals
                  </Typography>
                  <div className="bg-blue-gray-50 mt-5 mx-1.5 rounded-2xl py-2 px-4">
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                      <div className="py-2 text-left">
                        <Typography 
                          variant="small" 
                          color="blue-gray"
                          className="text-sm font-medium text-blue-gray-300"
                          >
                            Time
                        </Typography>
                        <Typography 
                          variant="h6" 
                          color="blue-gray"
                          className="text-md font-bold text-blue-gray-600"
                          >
                            12:00 - 12:30
                        </Typography>
                      </div>
                      <div className="py-2 text-left">
                        <Typography 
                          variant="small" 
                          color="blue-gray"
                          className="text-sm font-medium text-blue-gray-300"
                          >
                            Duration
                        </Typography>
                        <Typography 
                          variant="h6" 
                          color="blue-gray"
                          className="text-md font-medium text-blue-gray-600"
                          >
                            30 mins
                        </Typography>

                      </div>
                      <div className="py-2 text-left">
                        <Typography 
                          variant="small" 
                          color="blue-gray"
                          className="text-sm font-medium text-blue-gray-300"
                          >
                            Members
                        </Typography>
                        {projectsTableData[3].members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>  
      </div>
    </div>
  );
}

export default Home;
