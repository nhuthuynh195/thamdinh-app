export const xml = `
<?xml version="1.0" encoding="UTF-8"?>
    <document>
        <text-line>--------------------------------</text-line>
        <line-feed />
        <text-line>BIEN NHAN             {{date}}\n</text-line>
        <text-line>{{id}}{{line1}}{{name}}\n\n</text-line>
        <align mode="center">
        <bold>
            <text-line size="1:1">{{moneyPay}}\n\n</text-line>
        </bold>

        </align>

        <text-line size="1:0">CL:{{paid_period}}{{line5}}Tre:{{lateDate}}\n</text-line>
        <text-line>Du :{{line3}}{{Rspay}}\n</text-line>

        <text-line>Ma GD : {{line4}} {{trasaction_id}}\n</text-line>
        <line-feed />
        <text-line>----------{{phone}}----------</text-line>
        <line-feed />
        <line-feed />
      <paper-cut/>
    </document>
    `;
