// import { useState, useEffect } from 'react'
import { Outlet, useParams } from "react-router-dom";
import { Typography, Tag, Avatar } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import logo from "../assets/logo-blockforgex.png";
import step1Image from "../assets/step1.png";
import step2Image from "../assets/step2.png";
import step5Image from "../assets/step5.png";
import useIsDesktop from "../hooks/useIsDesktop";
const { Title, Paragraph, Text } = Typography;

const STEP_LEFT = {
  1: {
    logoText: "BLOCKFORGEX",
    title: "Apply for Exciting Opportunities in Blockchain and Crypto",
    desc: "Join Blockforgex and explore a range of roles in the fast-growing blockchain and crypto industry. Start your journey with a simple application process.",
    bottom: {
      type: "image",
      src: step1Image,
      alt: "Blockforgex hero",
      notFull: false,
    },
  },

  2: {
    logoText: "BLOCKFORGEX",
    title: "Select your Business Type",
    desc: "Help us tailor the opportunities and contracts to suit your profile — whether you’re an independent freelancer or representing a company.",
    bottom: {
      type: "image",
      src: step2Image,
      alt: "Business type illustration",
      notFull: true,
    },
  },

  3: {
    logoText: "BLOCKFORGEX",
    title: "Where are you based?",
    desc: "Let us know your location so we can match you with opportunities that fit your region and availability.",
    bottom: {
      type: "testimonial",
      quote:
        "Working with BlockforgeX has been a game-changer for us. Their expertise in Blockchain technology helped us streamline our processes and enhance security, leading to unprecedented growth. Their team is highly professional.",
      author: "Alice Johnson",
      role: "CEO, FinTech Innovations Ltd.",
      avatar: "https://i.pravatar.cc/80?img=5",
    },
  },

  4: {
    logoText: "BLOCKFORGEX",
    title: "What's your minimum preferred monthly rate?",
    desc: "Set your expected monthly rate so we can match you with opportunities that meet your financial goals.",
    bottom: {
      type: "panel",
      title: "Full-time and part-time Blockforgex jobs offer",
      bullets: [
        "Predictable pay, every month.",
        "Consistent working hours.",
        "Up to 24 “flex” days off per year.",
      ],
    },
  },

  5: {
    logoText: "BLOCKFORGEX",
    title: "What type commitment do you prefer?",
    desc: "Choose a work schedule that fits your lifestyle — from full-time roles to flexible, on-demand opportunities.",
    bottom: {
      type: "image",
      src: step5Image,
      alt: "Blockforgex hero",
      notFull: true,
    },
  },

  6: {
    logoText: "BLOCKFORGEX",
    title: "What's your English Level?",
    desc: "Select the option that best describes your English proficiency to help us match you with the right projects and teams.",
    bottom: {
      type: "testimonial",
      quote:
        "Working with BlockforgeX has been a game-changer for us. Their expertise in Blockchain technology helped us streamline our processes and enhance security, leading to unprecedented growth. Their team is highly professional.",
      author: "Alice Johnson",
      role: "CEO, FinTech Innovations Ltd.",
      avatar: "https://i.pravatar.cc/80?img=5",
    },
  },

  7: {
    logoText: "BLOCKFORGEX",
    title: "Can You Add Your Link?",
    desc: "Share your professional profiles or portfolio links so we can better understand your background and experience.",
    bottom: {
      type: "testimonial",
      quote:
        "Working with BlockforgeX has been a game-changer for us. Their expertise in Blockchain technology helped us streamline our processes and enhance security, leading to unprecedented growth. Their team is highly professional.",
      author: "Alice Johnson",
      role: "CEO, FinTech Innovations Ltd.",
      avatar: "https://i.pravatar.cc/80?img=5",
    },
  },
};

function LeftBottom({ cfg }) {
  if (!cfg) return null;

  if (cfg.type === "image" || cfg.src || cfg.image) {
    const src = cfg.src || cfg.image;
    const notFull = cfg.notFull ? "w-[32vw]" : "w-[32vw]  ";

    if (!src) return null;

    return (
      <div className="w-full flex justify-start">
        <img
          src={src}
          alt={cfg.alt || ""}
          className={`${notFull}  h-auto rounded-xl object-contain`}
          loading="lazy"
        />
      </div>
    );
  }

  if (cfg.type === "cluster") {
    const chips = cfg.chips ?? [];
    return (
      <div className="mt-8">
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <Tag
                key={i}
                color="processing"
                className="rounded-full px-3 py-1"
              >
                {c}
              </Tag>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (cfg.type === "panel") {
    return (
      <div
        className="
         rounded-[12px] bg-[#F2F2FD]
        py-7 px-5
      "
      >
        <Text className="!text-[#4F46E5] !font-medium !text-[2.5vh]">
          {cfg.title}
        </Text>

        <ul className="!mt-3 flex flex-col gap-2">
          {cfg.bullets?.map((b, i) => (
            <li key={i} className="flex items-start gap-4 !text-[1.9vh]">
              <CheckCircleFilled
                style={{ color: "#22c55e" }}
                className="mt-0.5"
              />
              <span className="text-[#696969]">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (cfg.type === "testimonial") {
    return (
      <div className="">
        <div className="text-[4.1vh] leading-none text-gray-300">“</div>
        <Paragraph className="!mt-2 !text-gray-700 !text-[2.6vh]">
          {cfg.quote}
        </Paragraph>
        <div className="mt-4 flex items-center gap-3">
          <Avatar size={44} src={cfg.avatar} />
          <div>
            <Text strong>{cfg.author}</Text>
            <div className="text-gray-500 text-sm">{cfg.role}</div>
          </div>
        </div>
      </div>
    );
  }

  if (cfg.type === "cta") {
    return (
      <div className="mt-8 grid grid-cols-[auto,1fr] gap-4 items-center">
        {cfg.illustration && (
          <img
            src={cfg.illustration}
            alt=""
            className="h-24 w-auto rounded-xl"
            loading="lazy"
          />
        )}
        <Text className="text-indigo-700 font-semibold">{cfg.text}</Text>
      </div>
    );
  }

  return null;
}

export default function ApplicationLayout() {
  const isDesktop = useIsDesktop();
  const { step: stepStr } = useParams();
  const step = Number(stepStr) || 1;
  const meta = STEP_LEFT[step] ?? STEP_LEFT[1];

  return (
    <div className="h-[100vh] lg:h-[100dvh] grid grid-cols-1 lg:grid-cols-2 lg:p-[4.2vh]">
      {isDesktop && (
        <aside className="bg-[#F9F9FD] ">
          <div className="min-h-full p-[4.2vh] flex flex-col justify-between">
            <div className="w-full">
              <div className="flex items-center  mb-[3.8vh] shrink-0">
                <img src={logo} alt="Blockforgex" className="w-[18vh]" />
              </div>

              <div className="w-full">
                <Title
                  level={2}
                  className="!text-[4.1vh] !leading-[120%] !font-semibold !tracking-normal md:!w-full overflow-hidden !mb-2"
                >
                  {meta.title}
                </Title>
                <Paragraph className="!text-gray-600 !leading-[150%] !text-[1.9vh]">
                  {meta.desc}
                </Paragraph>
              </div>
            </div>

            <LeftBottom cfg={meta.bottom} />
          </div>
        </aside>
      )}

      <main className="bg-white lg:h-full w-full">
        <div className="h-full w-full">
          <Outlet context={{ leftMeta: meta }} />
        </div>
      </main>
    </div>
  );
}
