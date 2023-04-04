import { Document, Table, TableRow, TableCell, Paragraph, Packer } from "docx";
import { saveAs } from "file-saver";
import { useMemo } from "react";
const Word = ({ data }) => {
    const createTable = () => {
      const rows = [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Name")]
            }),
            new TableCell({
              children: [new Paragraph("Address")]
            }),
            new TableCell({
              children: [new Paragraph("Gender")]
            }),
            new TableCell({
              children: [new Paragraph("Age")]
            }),
            new TableCell({
              children: [new Paragraph("Birthdate")]
            }),
            new TableCell({
              children: [new Paragraph("Service")]
            })
          ]
        })
      ];

      {
        data.map((item) => {
            console.log(item.fname)
        })

      }
  
      data.map((item) => {
        
        const row = new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(item.fname)]
            }),
            new TableCell({
              children: [new Paragraph(item.address)]
            }),
            new TableCell({
              children: [new Paragraph(item.gender)]
            }),
            new TableCell({
              children: [new Paragraph(item.age)]
            }),
            new TableCell({
              children: [new Paragraph(item.birthDate)]
            }),
            new TableCell({
              children: [new Paragraph(item.reasons)]
            })
          ]
        });
        rows.push(row);
      });
  
      return new Table({
        rows: rows,
        width: {
          size: 100,
        },
      });
    };
  
    const generate = () => {
      const doc = new Document({
        sections: [{ children: [createTable()] }],
      });
  
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "example.docx");
      });
    };
  
    return (
      <div className="App">
        <h2>Edit to see some magic happen!</h2>
        <button onClick={generate}>Generate doc</button>
      </div>
    );
  };
  
  export default Word;
  