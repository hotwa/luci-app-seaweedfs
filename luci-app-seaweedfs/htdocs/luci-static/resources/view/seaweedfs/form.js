'use strict';
'require ui';
'require form';
'require uci';
'require rpc';

var callService = rpc.declare({
    object: 'service', method: 'list', params: ['name']
});

return ui.page.view.extend({
    load: function() {
        return Promise.all([
            uci.load('seaweedfs'),
            callService('seaweedfs').catch(function() { return {}; })
        ]);
    },

    render: function(data) {
        var m = new form.Map('seaweedfs', _('SeaweedFS'),
            _('Configure SeaweedFS service and startup options.'));

        var s = m.section(form.TypedSection, 'seaweedfs', _('Settings'));
        s.anonymous = true;
        s.addremove = false;

        var o;

        o = s.option(form.Flag, 'enabled', _('Enable'));
        o.rmempty = false;

        o = s.option(form.ListValue, 'role', _('Role'));
        o.value('server', 'server');
        o.value('master', 'master');
        o.value('volume', 'volume');
        o.value('filer', 'filer');
        o.value('s3', 's3');
        o.rmempty = false;

        o = s.option(form.Value, 'data_dir', _('Data Directory'));
        o.placeholder = '/opt/seaweedfs';

        o = s.option(form.Value, 'user', _('Run as user'));
        o.placeholder = 'root';

        o = s.option(form.Value, 'extra_args', _('Extra Arguments'));
        o.placeholder = '--help';
        o.rmempty = true;

        return m.render();
    }
});

