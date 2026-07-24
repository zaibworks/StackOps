import { Status } from "@prisma/client"

export  type TaskFilter = "all" | "assignedToMe" | "createdByMe";

export interface GetMytaskTypes{
  userId:number
  page:number
  limit:number
  filter:TaskFilter
  status?:Status
  workspaceId?:number
}