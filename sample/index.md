```tsx
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import React, { ComponentProps } from 'react';
import { createRoot } from 'react-dom/client';

import { Button } from '../button';

import { onPhone } from '@/config/mui/breakpoints';
import { WonderThemeProvider } from '@/config/mui/theme';
import { useFuncLoading } from '@/utils/hooks';

const Container = styled(Dialog)`
	text-align: center;

	.MuiPaper-root {
		display: flex;
		flex-direction: column;
		padding: 40rem 0;
		width: 560px;
		max-height: initial;
		max-width: initial;
		min-height: initial;
		min-width: initial;
		${onPhone()} {
			padding: 40rem 10rem;
		}
	}
	.title {
		font-weight: 700;
		font-size: 30px;
		line-height: 38px;
	}
	.content {
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		margin-top: 10px;
		margin-bottom: 50px;
	}
	.buttons {
		width: Min(160rem, 39%);
	}
	.buttons + .buttons {
		margin-left: 10px;
	}
`;

type Props = {
	title: string;
	message: string;
	cancelLabel?: string;
	confirmLabel?: string;
	onConfirm?: () => Promise<unknown> | void;
	onCancel?: () => void;
} & ComponentProps<typeof Dialog>;
const Confirm: React.FC<Props> = ({
	title,
	message,
	cancelLabel,
	confirmLabel,
	onConfirm,
	onCancel,
	...props
}) => {
	const [_onConfirm, isLoading] = useFuncLoading(onConfirm);
	return (
		<Container {...props}>
			<div className="title">{title ?? '-'}</div>
			<div className="content">{message ?? '-'}</div>
			<div>
				<Button
					className="buttons"
					variant="outlined"
					color="inherit"
					onClick={onCancel}
				>
					{cancelLabel ?? 'Cancel'}
				</Button>
				<Button
					loading={isLoading}
					className="buttons"
					variant="contained"
					autoFocus
					onClick={_onConfirm}
				>
					{confirmLabel ?? 'Confirm'}
				</Button>
			</div>
		</Container>
	);
};

export const confirm = ({ onCancel, ...props }: Omit<Props, 'open'>) => {
	const div = document.createElement('div');
	const root = createRoot(div);
	return new Promise<{ done: () => void; failed: (reason: unknown) => void }>(
		(done, failed) => {
			root.render(
				<WonderThemeProvider>
					<Confirm
						onCancel={() => {
							onCancel?.();
							root.unmount();
							div.remove();
							failed();
						}}
						onConfirm={async () => {
							try {
								await new Promise<void>((resolve, reject) => {
									/**
									 * a confirm instance has only one chance to call done();
									 * so if this promise failed, current confirm must be destoried,
									 * or this promise will hangon forever.
									 */
									done({ done: resolve, failed: reject });
								});
							} catch (e) {
								console.error(e);
							}
							root.unmount();
							div.remove();
						}}
						{...props}
						open
					/>
				</WonderThemeProvider>
			);
			document.body.appendChild(div);
		}
	);
};
```