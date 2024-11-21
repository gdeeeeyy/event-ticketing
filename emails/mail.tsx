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
  import * as React from "react";
  import { useQRCode } from 'next-qrcode';
  
  interface mailDeets {
    Name?: string;
    Events?: string;
    Deets?:string[];
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const MailTemplate = ({
    Name,
    Events,
    Deets,
  }: mailDeets) => {
    const { Canvas } = useQRCode();
  
    return (
      <Html>
        <Head />
        <Preview>Confirmation of Your Registration for Kalaiyugam on Nov 30, 2024 - Reg.</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo}>
              <Img src='public/kalaiyugam-logo.png' width={114} />
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
              We are delighted to confirm your registration for Kalaiyugam: A Celebration of Art, our flagship event celebrating creativity, scheduled for 30th November 2024. This email serves as both a confirmation of your participation and an official On-Duty letter, permitting you to attend the event.
              </Text>
              <Text style={paragraph}>
              We trust that you will bring your best self, uphold the highest standards of conduct, and engage responsibly as we welcome you to Kalaiyugam—a celebration you will not forget.
              </Text>
              <Text style={paragraph}>
              Please ensure you carry a copy of this email as it serves as your OD letter and save the attached QR code for verification of your registration for the following events {Events}.
              </Text>
              <Canvas
                text={Deets}
                options={{
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                  },
                }}
              />
              <Text style={paragraph}>
              If you have any questions or require further assistance, feel free to contact us at{" "}
                <Link href="#" style={link}>
                impact@citchennai.net
                </Link>{" "}
              </Text>
              <Text style={paragraph}>
                With Regards,
                <br />
                Team Impact
              </Text>
            </Section>
          </Container>
              {/* <img>{QrCode}</img> */}
        </Body>
      </Html>
    );
  };
  
  
  export default MailTemplate;
  
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
  
  const footer = {
    maxWidth: "580px",
    margin: "0 auto",
  };
  
  const content = {
    padding: "5px 20px 10px 20px",
  };
  
  const logo = {
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    padding: 30,
  };
  
  const sectionsBorders = {
    width: "100%",
    display: "flex",
  };
  
  const sectionBorder = {
    borderBottom: "1px solid rgb(238,238,238)",
    width: "249px",
  };
  
  const sectionCenter = {
    borderBottom: "1px solid rgb(145,71,255)",
    width: "102px",
  };
  
  const link = {
    textDecoration: "underline",
  };
  