"""Dependency-free checks for the static portfolio before publication."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re

root=Path(__file__).resolve().parent.parent
site=root/'site'
errors=[]

class Page(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=[];self.refs=[];self.images=[]
    def handle_starttag(self,tag,attrs):
        attributes=dict(attrs)
        if 'id' in attributes:self.ids.append(attributes['id'])
        if tag=='img':self.images.append(attributes)
        for key in ('href','src','data-full'):
            value=attributes.get(key)
            if value:self.refs.append('assets/'+value if key=='data-full' else value)

for path in site.rglob('*.html'):
    text=path.read_text(encoding='utf-8')
    page=Page();page.feed(text)
    if len(page.ids)!=len(set(page.ids)):errors.append(f'{path.name}: duplicate IDs')
    for image in page.images:
        if image.get('src') and not image.get('alt'):errors.append(f'{path.name}: image without description')
    for value in page.refs:
        reference=urlsplit(value)
        if reference.scheme or reference.netloc:continue
        if reference.path:
            target=(path.parent/unquote(reference.path)).resolve()
            if not target.is_relative_to(site.resolve()) or not target.is_file():errors.append(f'{path.name}: missing or external local path {value}')
        elif reference.fragment and reference.fragment not in page.ids:errors.append(f'{path.name}: missing anchor {value}')
    for sensitive in ('base-token','app_secret','access_token','file:///','D:/pn','D:\\pn','下载简历','查看简历'):
        if sensitive in text:errors.append(f'{path.name}: blocked content marker {sensitive}')

for file in site.rglob('*'):
    if not file.is_file():continue
    if file.suffix.lower() in ('.pdf','.docx','.xlsx','.psd','.psb','.zip') or '.private.' in file.name:
        errors.append(f'Private or source document in published site: {file.name}')
    if file.stat().st_size>=100*1024*1024:errors.append(f'File exceeds GitHub regular file limit: {file.name}')
    if file.suffix.lower() in ('.js','.css','.html'):
        text=file.read_text(encoding='utf-8')
        if re.search(r'\b(?:ghp_|github_pat_)[A-Za-z0-9_]{15,}',text):errors.append(f'Potential GitHub credential in {file.name}')

if not (site/'index.html').is_file():errors.append('Missing site/index.html')
if '--bg:#f3f3f3' not in (site/'style.css').read_text(encoding='utf-8'):errors.append('Unexpected base background')
if errors:raise SystemExit('\n'.join(errors))
print('PASS: static references, asset sizes, publication boundaries and background color.')
