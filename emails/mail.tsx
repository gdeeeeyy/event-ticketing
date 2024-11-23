import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

interface mailDeets {
  Name?: string;
  Events?: string;
  Deets?: string;
}

export const MailTemplate = ({ Name, Events, Deets }: mailDeets) => {
  return (
    <Html>
      <Head />
      <Preview>Confirmation of Your Registration for Kalaiyugam on Nov 30, 2024 - Reg.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <table
              width="100%"
              style={{
                borderSpacing: 0,
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <tr>
                <td style={{ padding: "30px", textAlign: "center" }}>
                  <img
                    src="https://i.imgur.com/nQuHLgb.png"
                    alt="Kalaiyugam Logo"
                    width="350px"
                    style={{
                      display: "block",
                      margin: "0 auto",
                      maxWidth: "100%",
                    }}
                  />
                </td>
              </tr>
            </table>
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Greetings {Name}!</Text>
            <Text style={paragraph}>
              We are delighted to confirm your registration for Kalaiyugam: The
              Celebration of Art, our flagship event celebrating creativity,
              scheduled for 30th November 2024. This email serves as both a
              confirmation of your participation and an official On-Duty letter,
              permitting you to attend the event.
            </Text>
            <Text style={paragraph}>
              We trust that you will bring your best self, uphold the highest
              standards of conduct, and engage responsibly as we welcome you to
              Kalaiyugam: The celebration you will not forget.
            </Text>
            <Text style={paragraph}>
              Please ensure you carry a copy of this email as it serves as your
              OD letter and save the attached QR code for verification of your
              registration for {Events} at Kalaiyugam: The Celebration of Art.
            </Text>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
            <table
              width="100%"
              style={{
                borderSpacing: 0,
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <tr>
                <td style={{ padding: "30px", textAlign: "center" }}>
                  <Img
                  src={`http://api.qrserver.com/v1/create-qr-code/?data=${Deets}`}
                  width="150"
                  height="150"
                  alt="QR Code"
                  style={{
                    display: "block",
                    margin:"0 auto",
                    maxWidth: "100%",
                  }}
              />
                </td>
              </tr>
            </table>
            </div>
            <Text style={paragraph}>
              If you have any questions or require further assistance, feel free
              to contact us at{" "}
              <Link href="mailto:impact@citchennai.net" style={link}>
                impact@citchennai.net
              </Link>
            </Text>
            <Text style={paragraph}>
              With Regards,
              <br />
              Team Impact
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MailTemplate;

// CSS for the email content
const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";
const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
};

const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "4px solid rgb(0, 0, 0)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "4px solid rgb(0, 0, 0)",
  width: "102px",
};

const link = {
  textDecoration: "underline",
};
