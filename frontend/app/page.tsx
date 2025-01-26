"use client";
import { TasksDataTable } from "@/components/table/tasksTable/components/data-table";
import { useAuthContext } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const { token } = useAuthContext();
  const { tasksData, getTasksData } = useDataContext();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      if (token) {
        getTasksData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {
        isClient &&
        <TasksDataTable
          data={tasksData}
        />
      }
      {
        tasksData.length
      }
    </section>
  );
}
