import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { GitHub, Key, Twitter, Mail } from 'react-feather';
import { Mastodon, Tumblr } from '@icons-pack/react-simple-icons';
import dayjs from 'dayjs';

import { DiscordPresence } from 'components/presence';
import { GitHubSection, ToolsSection } from 'components/section';
import { Header, Paragraph, SubHeader } from 'components/text';

import { BIRTHDAY, GITHUB_USERNAME } from 'lib/constants';
import { isDate } from 'lib/time';
import { GitHubPinnedRepo, useGitHubPinnedRepos } from 'lib/hooks';

interface Props {
	pinnedRepos: (GitHubPinnedRepo & { url: string })[];
}

export default function Home(props: Props) {
	const socials = [
		{
			link: 'https://github.com/LavenderColoredFolf',
			icon: GitHub,
		},
		{
			link: 'https://twitter.com/LavenderFolf',
			icon: Twitter,
		},
		{
			link: 'mailto:hi@itsalexander.dev',
			icon: Mail
		}
	];

	const [isBirthday, setIsBirthday] = useState(isDate(BIRTHDAY));

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setIsBirthday(isDate(BIRTHDAY));

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [intervalCheck]);

	const { data: github = props.pinnedRepos } =
		useGitHubPinnedRepos(GITHUB_USERNAME);

	return (
		<div>
			<div
				style={{
					marginBottom: '18px',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				{socials.map((social, i) => (
					<Link href={social.link} passHref key={`social${i}`}>
						<a target="_blank" style={{ paddingRight: '10px' }}>
							<social.icon width={28} height={28} className={'socialIcon'} />
						</a>
					</Link>
				))}
				<DiscordPresence id={'988801425196867644'} />
			</div>
			<Header>Hey, I&lsquo;m Alexander {isBirthday ? '🥳' : '👋'}</Header>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m a <Age birthdate={BIRTHDAY} />
				-year-old developer from Canada.
			</Paragraph>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m currently working on my skills as a full
				stack developer using modern technologies. I am currently
				working lots of projects, one being Harmony Radio!
			</Paragraph>
			<br />
			<SubHeader>What am I building? 🚀</SubHeader>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m currently trying to balance my time wisely, however
				below you'll see some of my favorite projects I've worked on.
			</Paragraph>
			<br />
			<GitHubSection pinnedRepos={github!} />
			<br />
			<SubHeader>What am I using? 🛠️</SubHeader>
			<Paragraph style={{ marginTop: '18px' }}>
				I'm always open to learning something new, and while I tend to
				stick to stuff I know, I'm trying my best to branch out and
				try some other languages such as Java! You'll see some of my
				"frequent flyers" below when it comes to languages.
				
			</Paragraph>
			<br />
			<ToolsSection />
		</div>
	);
}

const Age = ({ birthdate }: { birthdate: string }) => {
	const [clicked, setClicked] = useState(false);

	const [year, setYear] = useState(dayjs().diff(birthdate, 'year'));

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setYear(dayjs().diff(birthdate, 'year', true));

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [birthdate, intervalCheck]);

	return (
		<span onClick={() => setClicked(!clicked)} className={'clickable'}>
			{clicked ? `~${year.toFixed(8)}` : Math.floor(year)}
		</span>
	);
};

export const getStaticProps: GetStaticProps<Props> = async function () {
	const pinnedRepos = await fetch(
		`https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USERNAME}`
	).then(async response => response.json() as Promise<GitHubPinnedRepo[]>);

	return {
		props: {
			pinnedRepos: pinnedRepos.map(repo => ({
				...repo,
				url: `https://github.com/${repo.owner}/${repo.repo}`,
			})),
		},
	};
};
