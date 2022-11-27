import {
	Cloudflare,
	Deno,
	Git,
	Go,
	Icon,
	Java,
	Javascript,
	Kotlin,
	Nextdotjs,
	Nodedotjs,
	Postgresql,
	ReactJs,
	Redis,
	Styledcomponents,
	Supabase,
	Svelte,
	Typescript,
	Vercel,
	Php,
	Html5,
	CssThree,
	Mongodb,
	Tailwindcss,
	Yarn,

} from '@icons-pack/react-simple-icons';

import { WAKATIME_USERNAME } from 'lib/constants';
import {
	useWakaTimeStats,
	WakaTimeLanguage,
	useLanguageFromWakaTimeStats,
} from 'lib/hooks';

import ReactTooltip from 'react-tooltip';

export const Tools = () => {
	const { data: wakatime } = useWakaTimeStats(WAKATIME_USERNAME);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-start',
				flexWrap: 'wrap',
			}}
		>
			<ToolListItem
				Logo={Typescript}
				text={'TypeScript'}
			/>
			<ToolListItem Logo={Javascript} text={'Javascript'} />
			<ToolListItem Logo={Php} text={'Php'} />
			<ToolListItem Logo={Html5} text={'HTML'} />
			<ToolListItem Logo={CssThree} text={'CSS'} />
			<ToolListItem Logo={Mongodb} text={'Mongo'} />
			<ToolListItem Logo={Tailwindcss} text={'Tailwind CSS'} />
			<ToolListItem Logo={Yarn} text={'Yarn'} />
			<ToolListItem Logo={Cloudflare} text={'Cloudflare'} />
			<ToolListItem Logo={ReactJs} text={'React.js'} />
			<ToolListItem Logo={Nextdotjs} text={'Next.js'} />
			<ToolListItem Logo={Styledcomponents} text={'styled-components'} />
			<ToolListItem Logo={Nodedotjs} text={'Node.js'} />
			<ToolListItem Logo={Git} text={'Git'} />
		</div>
	);
};

const ToolListItem = ({
	Logo,
	text,
	lang,
}: {
	Logo: Icon;
	text: string;
	lang?: WakaTimeLanguage;
}) => {
	return (
		<>
			{lang ? (
				<ReactTooltip backgroundColor="#0d1117" border borderColor="#27292e" />
			) : (
				<></>
			)}
			<div
				style={{
					margin: '10px',
				}}
				className={'ToolListItem'}
				data-tip={
					lang ? `${lang.hours}h ${lang.minutes}m past week` : undefined
				}
			>
				<p
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Logo color={'#ffffff'} size={20} style={{ marginRight: '8px' }} />{' '}
					<span
						style={{
							fontSize: '16px',
							borderBottom: lang ? '1px dotted white' : undefined,
						}}
					>
						{text}
					</span>
				</p>
			</div>
		</>
	);
};
