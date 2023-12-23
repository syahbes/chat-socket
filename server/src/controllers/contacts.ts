import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generic500Error } from "../utils/constance";

class ContactController {
  constructor(private prisma: PrismaClient) {}

  async getContacts(req: Request, res: Response) {
    try {
      const MyId = req.user?.id as number;
      const contacts = await this.prisma.contact.findMany({
        where: {
          userId: MyId,
        },
        orderBy: { createdAt: "asc" },
      });
      return res.status(200).json({ contacts });
    } catch (error) {
      return generic500Error(res, error);
    }
  }

  async createContact(req: Request, res: Response) {
    try {
      const MyId = req.user?.id as number;
      const { username }: { username: string } = req.body;
      //check if there is user with the given username
      const relatedUser = await this.prisma.user.findUnique({
        where: { username },
      });

      if (!relatedUser) {
        return res
          .status(404)
          .json({ message: "Could not find related contact" });
      }
      //check if username is me
      if (relatedUser.id === MyId) {
        return res
          .status(400)
          .json({ message: "Cannot add yourself as a contact" });
      }
      //check if I already have this contact
      const isContactExists = await this.prisma.contact.findFirst({
        where: { userId: MyId, username },
      });
      if (isContactExists) {
        return res.status(400).json({ message: "Contact already exists" });
      }

      //check if there is already conversation
      const foundConversation = await this.prisma.conversation.findFirst({
        where: {
          participants: { hasEvery: [MyId, relatedUser.id] },
        },
      });

      //flow for conversation exists
      if (foundConversation) {
        const contact = await this.newContact({
          userId: MyId,
          username,
          photo: relatedUser.photo,
          conversationId: foundConversation.id,
        });
        return res
          .status(201)
          .json({ message: "New contact created", contact });
      }

      //flow for conversation not exists
      const conversation = await this.newConversation([MyId, relatedUser.id]);
      const contact = await this.newContact({
        userId: MyId,
        username,
        photo: relatedUser.photo,
        conversationId: conversation.id,
      });
      return res.status(201).json({ message: "New contact created", contact });

    } catch (error) {
      return generic500Error(res, error);
    }
  }
  async newContact({
    userId,
    username,
    photo,
    conversationId,
  }: {
    userId: number;
    username: string;
    photo: string;
    conversationId: number;
  }) {
    return await this.prisma.contact.create({
      data: {
        userId,
        username,
        photo,
        conversationId,
      },
    });
  }
  async newConversation(idArray: number[]) {
    return await this.prisma.conversation.create({
      data: {
        participants: idArray,
      },
    });
  }
}

export default ContactController;