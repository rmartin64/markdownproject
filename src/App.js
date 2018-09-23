import React, { Component } from 'react';
import './App.css';
import marked from 'marked';
import {resolveUrl} from 'marked';

let renderer = new marked.Renderer();
const REGEX = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

renderer.link = function (href, title, text) {
  if (null && !REGEX.test(href)) {
    href = resolveUrl(null, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return text;
  }
  let out = `<a target="_blank" href=${href}`
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
text: ''
    }
    this.renderText = this.renderText.bind(this);
    this.allowMarkdown = this.allowMarkdown.bind(this);
  }
  renderText() {
    this.setState({
      text: document.getElementById('editor').value
    })
  }
  allowMarkdown() {

    return {__html: marked(this.state.text, {gfm: true, breaks: true, renderer: renderer})}
  }

  componentDidMount() {
    document.getElementById('editor').value = `# Markdown Previewer - built with React

## As you type GitHub markdown in the upper window, it will be rendered in the lower window as HTML.

I have programmed this markdown previewer while utilizing the markedjs library in order to practice React. You can check out my other projects [here](https://codepen.io/rmartin/).

It's much easier to make **dynamic** websites with React thanks to the way you can render a \`<div></div>\` or **any** other HTML element based on the internal state.

For example, this very markdown previewer is utilizing React's local state to render the text:
\`\`\`
  constructor(props) {
    super(props);
    this.state = {
text: ''
    }
    this.renderText = this.renderText.bind(this);
    this.allowMarkdown = this.allowMarkdown.bind(this);
  }
  renderText() {
    this.setState({
      text: document.getElementById('editor').value
    })
  }
\`\`\`
Some other handy coding tools are
- Bootstrap
- jQuery
- SASS

React is a fairly recent development, but it has been widely adopted for the creation of UIs. As said on Wikipedia:
> React was created by Jordan Walke, a software engineer at Facebook.
> He was influenced by XHP, an HTML component framework for PHP.
> It was first deployed on Facebook's newsfeed in 2011 and later on Instagram.com in 2012.

Its icon is pretty cool looking!
![react icon](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/210px-React-icon.svg.png)`;
      this.setState({
        text: document.getElementById('editor').value
      });
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className='card m-3'>
          <div className='card-header text-center'>Markdown Editor</div>
<textarea className='card-body form-control form-control-lg' id='editor' onInput={this.renderText}>
</textarea>
</div>
<div className='card'>
  <div className='card-header text-center'>Rendered Markdown</div>
<div id='preview' className='card-body' dangerouslySetInnerHTML={this.allowMarkdown()}>
</div>
</div>
</div>
    );
  }
}

export default App;
