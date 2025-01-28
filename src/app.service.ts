import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): object {
    console.log("Fetching hero section content");
    return {
      titre:
        "Partagez, collaborez et accédez à tout documents en toute simplicité.",
      message:
        "Resourcify vous donne l'occasion non seulement de partager vos connaissances et ressources mais également de trouver tout ce que vous désirez.",
      status: 200,
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s360-c-no",
    };
  }
}
