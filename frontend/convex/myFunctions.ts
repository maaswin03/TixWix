import { query} from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const localevents = query({
  args: {},
  handler: async (ctx) => {
    const data = await ctx.db.query("localevents").collect();
    return data;
  },
});

export const allevents = query({
  args: {},
  handler: async (ctx) => {
    const data = await ctx.db.query("allexperiences").collect();
    console.log(data);
    return data;
  },
});

export const createTask = mutation({
  args: { name: v.string(), email: v.string() },
  handler: async (ctx, { name, email }) => {
    try {
      const existingUser = await ctx.db.query("user_data")
        .filter((q) => q.eq(q.field("email"), email))
        .first();
      
      if (existingUser) {
        console.log('User with this email already exists');
        return null;
      }

      const taskId = await ctx.db.insert("user_data", {
        name,
        email,
      });
      return taskId;
    } catch (error) {
      console.error("Error inserting data into the database:", error);
      throw new Error("Failed to create task");
    }
  },
});

export const concerts = query({
  args: {},
  handler: async (ctx) => {
    const data = await ctx.db.query("concerts").collect();
    return data;
  },
});

export const social = query({
  args: {},
  handler: async (ctx) => {
    const data = await ctx.db.query("social").collect();
    return data;
  },
});

export const create = mutation({
  args: { 
    name: v.string(), 
    date:v.string(),
    locations:v.string(),
    price:v.string(),
    event_type:v.string(),
    description:v.string()
  },
  handler: async (ctx, {name,date,locations,price,event_type,description}) => {
      const newTaskId = await ctx.db.insert("allexperiences", {
        name,
        date,
        locations,
        price,
        event_type,
        description
      });
      console.log('New user added');
      return newTaskId;
  },
});
