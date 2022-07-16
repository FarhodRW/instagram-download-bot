import { Bot } from "grammy";
import 'dotenv/config'
import { getApi } from "./getApi";

const bot = new Bot(String(process.env.TOKEN))


bot.command("start", (ctx) => {
    const name = ctx.from.first_name
    ctx.reply(`Welcome ${name} ! Send me an instagram link to download`); console.log('started')});

bot.on("message", async (ctx) => {
    try {
        
        const chatId = ctx.msg.chat.id;
        const name = ctx.from.first_name
        const text = ctx.msg.text;
       const isValid =  text.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(isValid){
            const getInsaUrl = await getApi(text);
            if(getInsaUrl.media) {
            await ctx.replyWithVideo(getInsaUrl.media, {
                caption: getInsaUrl.caption,
              });
            ctx.reply('Send me an instagram link')
            }
        else { 
            ctx.reply('Unfortunately, at the moment, bot can not send multiple media ☹️, but we are fixing that 🙂. Send a single video link.')
        }
        }
        else{
            ctx.reply(`${name}, please send a valid instagram url`)
        }

    } catch (error) {
        console.log(error);
        
    }
})

bot.start();